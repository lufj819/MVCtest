//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace MVCtest.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class synclog
    {
        public int id { get; set; }
        public Nullable<System.Guid> syncid { get; set; }
        public string contents { get; set; }
        public System.DateTime commit_time { get; set; }
        public string logon_user { get; set; }
        public string operation { get; set; }
        public string tablename { get; set; }
        public int rowid { get; set; }
        public string chrLocalNumber { get; set; }
        public string chrONLNumber { get; set; }
        public string eprojectid { get; set; }
        public string column_name { get; set; }
        public string original_value { get; set; }
        public string current_value { get; set; }
        public string undo_sql { get; set; }
    }
}