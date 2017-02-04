using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MVCtest.Models;

namespace MVCtest.DBAccess
{
    public class synclogDB
    {

        public static void SyncCreatelog(synclog log)
        {
            using (var db=new myDBEntities())
            {
                try
                {
                    db.synclog.Add(log);
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }      


        public static void SyncUpdatelog(IList<synclog> logs)
        {
            using (var db = new myDBEntities())
            {
                try
                {
                    db.synclog.AddRange(logs);
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }
    }
}