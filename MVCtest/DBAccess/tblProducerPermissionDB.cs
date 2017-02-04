using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MVCtest.Models;

namespace MVCtest.DBAccess
{
    public class tblProducerPermissionDB
    {
        public static tblProducerPermission GetProducerPermission(string userid)
        {
            tblProducerPermission pp = null;
            using (var db = new myDBEntities())
            {
                pp = db.tblProducerPermission.Where(p => p.chrUserID == userid).SingleOrDefault();
            }
            return pp;
        }
    }
}