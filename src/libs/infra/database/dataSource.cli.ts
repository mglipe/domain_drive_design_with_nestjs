import { DataSource } from "typeorm"; 
import { dataSourceOptions } from "./dataSource-options";

const dataSourceCLI = new DataSource(dataSourceOptions)

export default dataSourceCLI