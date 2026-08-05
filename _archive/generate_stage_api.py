import os
import re

SQL_DIR = r"C:\Users\hp\Downloads\BIOQUORA\backend"
MODELS_DIR = r"C:\Users\hp\Downloads\BIOQUORA\backend\api\models"
ROUTERS_DIR = r"C:\Users\hp\Downloads\BIOQUORA\backend\api\routers"
REACT_API_DIR = r"C:\Users\hp\Downloads\BIOQUORA\src\services"

def parse_sql(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    tables = {}
    matches = re.finditer(r"CREATE TABLE (\w+) \((.*?)\);", content, re.DOTALL | re.IGNORECASE)
    for match in matches:
        table_name = match.group(1)
        columns_str = match.group(2)
        columns = []
        for line in columns_str.split("\n"):
            line = line.strip().strip(",")
            if not line or line.startswith("--"): continue
            
            # Very basic parsing
            parts = line.split()
            if len(parts) >= 2:
                col_name = parts[0]
                col_type = parts[1].upper()
                columns.append((col_name, col_type))
        tables[table_name] = columns
    return tables

def to_camel_case(snake_str):
    components = snake_str.split('_')
    return "".join(x.title() for x in components)

def generate_models(stage_name, tables):
    out = ["from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime"]
    out.append("from sqlalchemy.dialects.postgresql import UUID as PG_UUID")
    out.append("from sqlalchemy.sql import func")
    out.append("from uuid import uuid4")
    out.append("from api.core.database import Base\n")
    
    for table_name, columns in tables.items():
        class_name = to_camel_case(table_name)
        out.append(f"class {class_name}(Base):")
        out.append(f"    __tablename__ = '{table_name}'")
        out.append(f"    __table_args__ = {{'extend_existing': True}}\n")
        
        for col_name, col_type in columns:
            python_attr = col_name
            if col_name == "metadata":
                python_attr = "metadata_col"
                db_col_str = "'metadata', "
            else:
                db_col_str = ""

            if "UUID" in col_type:
                if "PRIMARY" in col_type or col_name == "id":
                    out.append(f"    {python_attr} = Column({db_col_str}PG_UUID(as_uuid=True), primary_key=True, default=uuid4)")
                else:
                    out.append(f"    {python_attr} = Column({db_col_str}PG_UUID(as_uuid=True))")
            elif "VARCHAR" in col_type or "TEXT" in col_type or "STRING" in col_type:
                out.append(f"    {python_attr} = Column({db_col_str}Text)")
            elif "FLOAT" in col_type or "NUMERIC" in col_type or "REAL" in col_type:
                out.append(f"    {python_attr} = Column({db_col_str}Float)")
            elif "INT" in col_type or "BIGINT" in col_type:
                out.append(f"    {python_attr} = Column({db_col_str}Integer)")
            elif "BOOL" in col_type:
                out.append(f"    {python_attr} = Column({db_col_str}Boolean)")
            elif "JSON" in col_type:
                out.append(f"    {python_attr} = Column({db_col_str}JSON)")
            elif "TIMESTAMP" in col_type or "DATE" in col_type:
                out.append(f"    {python_attr} = Column({db_col_str}DateTime(timezone=True), server_default=func.now())")
            else:
                out.append(f"    {python_attr} = Column({db_col_str}Text) # Fallback for {col_type}")
        out.append("")
    
    with open(os.path.join(MODELS_DIR, f"{stage_name}.py"), "w", encoding="utf-8") as f:
        f.write("\n".join(out))

def generate_router(stage_name, tables):
    out = ["from fastapi import APIRouter, Depends"]
    out.append("from sqlalchemy.ext.asyncio import AsyncSession")
    out.append("from sqlalchemy.future import select")
    out.append("from api.core.database import get_db")
    out.append(f"from api.models.{stage_name} import *")
    out.append("")
    out.append(f"router = APIRouter(prefix='/api/v1/{stage_name}', tags=['{stage_name}'])\n")
    
    for table_name in tables.keys():
        class_name = to_camel_case(table_name)
        out.append(f"@router.get('/{table_name.replace('_registry', '')}')")
        out.append(f"async def get_{table_name}(db: AsyncSession = Depends(get_db)):")
        out.append(f"    result = await db.execute(select({class_name}))")
        out.append(f"    return result.scalars().all()\n")
        
        out.append(f"@router.post('/{table_name.replace('_registry', '')}')")
        out.append(f"async def create_{table_name}(data: dict, db: AsyncSession = Depends(get_db)):")
        out.append(f"    new_record = {class_name}(**data)")
        out.append(f"    db.add(new_record)")
        out.append(f"    await db.commit()")
        out.append(f"    await db.refresh(new_record)")
        out.append(f"    return new_record\n")
        
    with open(os.path.join(ROUTERS_DIR, f"{stage_name}.py"), "w", encoding="utf-8") as f:
        f.write("\n".join(out))

def generate_react_api(stage_name, tables):
    camel_stage = to_camel_case(stage_name)
    out = [f"// Auto-generated API service for {stage_name}"]
    out.append(f"const BASE_URL = '/api/v1/{stage_name}';\n")
    out.append(f"export const {camel_stage}API = {{")
    
    for table_name in tables.keys():
        endpoint = table_name.replace('_registry', '')
        func_name = to_camel_case(endpoint)
        out.append(f"  get{func_name}: async () => {{")
        out.append(f"    const res = await fetch(`${{BASE_URL}}/{endpoint}`);")
        out.append(f"    return res.json();")
        out.append(f"  }},")
        out.append(f"  create{func_name}: async (data: any) => {{")
        out.append(f"    const res = await fetch(`${{BASE_URL}}/{endpoint}`, {{")
        out.append(f"      method: 'POST',")
        out.append(f"      headers: {{'Content-Type': 'application/json'}},")
        out.append(f"      body: JSON.stringify(data)")
        out.append(f"    }});")
        out.append(f"    return res.json();")
        out.append(f"  }},")
        
    out.append("};\n")
    
    # Write to services
    with open(os.path.join(REACT_API_DIR, f"{stage_name}_api.ts"), "w", encoding="utf-8") as f:
        f.write("\n".join(out))

# We will run this for Stages 6-20 to fill all gaps
stages = [
    ("biovision", "step7_stage6_schemas.sql"),
    ("biocoder", "step7_stage7_schemas.sql"),
    ("biosimulation", "step7_stage8_schemas.sql"),
    ("biovalidator", "step7_stage9_schemas.sql"),
    ("bioassistant", "step7_stage10_schemas.sql"),
    ("bioinference", "step7_stage11_schemas.sql"),
    ("biosafe", "step7_stage12_schemas.sql"),
    ("bioeval", "step7_stage13_schemas.sql"),
    ("bioworkflow", "step7_stage14_schemas.sql"),
    ("biofactory", "step7_stage15_schemas.sql"),
    ("bioaihub", "step7_stage16_schemas.sql"),
    ("biolearning", "step7_stage17_schemas.sql"),
    ("biofederated", "step7_stage18_schemas.sql"),
    ("bioasi", "step7_stage19_schemas.sql"),
    ("biocore", "step7_stage20_schemas.sql")
]

for stage_name, file_name in stages:
    file_path = os.path.join(SQL_DIR, file_name)
    if os.path.exists(file_path):
        tables = parse_sql(file_path)
        generate_models(stage_name, tables)
        generate_router(stage_name, tables)
        generate_react_api(stage_name, tables)
        print(f"Generated {stage_name}")
    else:
        print(f"File not found: {file_path}")
