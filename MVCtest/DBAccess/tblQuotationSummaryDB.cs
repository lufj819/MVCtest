using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MVCtest.Models;
using System.Collections;

namespace MVCtest.DBAccess
{
    public class tblQuotationSummaryDB
    {
        public static IList<tblQuotationSummary> SelectQuotationSummaryByVertical(string[] vertical)
        {
            IList<tblQuotationSummary> qss = null;
            if (vertical!=null)
            {
                using (var db = new myDBEntities())
                {
                    //qss = (from qs in db.tblQuotationSummary where qs.chrVertical == vertical select qs).ToList<tblQuotationSummary>();
                    qss = (from qs in db.tblQuotationSummary
                           orderby qs.chrVertical, qs.chrQuotationNumber
                           where vertical.Contains(qs.chrVertical)
                           select qs).ToList<tblQuotationSummary>();
                }
            }

            return qss;
        }
    }
}