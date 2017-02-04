using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVCtest.DBAccess;
using MVCtest.Models;
using System.IO;
using NPOI;
using NPOI.HPSF;
using NPOI.HSSF;
using NPOI.POIFS;
using NPOI.Util;
using NPOI.HSSF.Util;
using NPOI.HSSF.Extractor;
using System.Reflection;
using System.Collections;
using NPOI.HSSF.UserModel;
using NPOI.XSSF.UserModel;
using System.Web.Http.Cors;

namespace MVCtest.Controllers
{
    //Controller跨域调用
    [EnableCors("*","*","*")]
    public class DemoController : Controller
    {
        #region 使用EF对BKFM进行数据库操作
        public ActionResult BKFMviewAddjob()
        {
            tblJob job = new tblJob();
            job.chrLocalNumber = "Project1";
            job.chrONLNumber = "NA";
            job.chrName = "Lufj Project";
            job.chrDivision = "CI";
            job.chrCountry = "China";
            job.chrProductType = "aaa";
            job.inteProjectID = "123";
            job.blKeyClient = false;
            //job.intComplexity = 2;
            job.dtmCreated = DateTime.Now;
            //job.dtmFinalQnrtoGO = null;

            int result = tblJobDB.CreateJob(job);
            //int result = tblJobDB.CreateJobBySQL(job);
            ViewBag.aaa = string.Format("数据库插入：{0}", result);
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult BKFMviewAddjobs()
        {
            IList<tblJob> jobs = new List<tblJob>();
            tblJob j1 = new tblJob();
            j1.chrLocalNumber = "Project2";
            j1.chrONLNumber = "NA2";
            j1.chrName = "Lufj Project2";
            j1.chrDivision = "CI";
            j1.chrCountry = "China";
            j1.chrProductType = "bbb";
            j1.inteProjectID = "123";
            j1.blKeyClient = false;
            j1.intComplexity = 3;
            j1.dtmCreated = DateTime.Now;
            //j1.dtmFinalQnrtoGO = null;
            jobs.Add(j1);

            tblJob j2 = new tblJob();
            j2.chrLocalNumber = "Project3";
            j2.chrONLNumber = "NA3";
            j2.chrName = "Lufj Project3";
            j2.chrDivision = "CI";
            j2.chrCountry = "China";
            j2.chrProductType = "ccc";
            j2.inteProjectID = "234";
            j2.blKeyClient = true;
            j2.intComplexity = 4;
            j2.dtmCreated = DateTime.Now;
            //j2.dtmFinalQnrtoGO = null;
            jobs.Add(j2);

            tblJob j3 = new tblJob();
            j3.chrLocalNumber = "Project4";
            j3.chrONLNumber = "NA4";
            j3.chrName = "Lufj Project4";
            j3.chrDivision = "online";
            j3.chrCountry = "China";
            j3.chrProductType = "ddd";
            //j3.inteProjectID = "234";
            j3.blKeyClient = false;
            j3.intComplexity = 5;
            j3.dtmCreated = DateTime.Now;
            //j3.dtmFinalQnrtoGO = DateTime.Now.AddMonths(-6);
            jobs.Add(j3);

            int result = tblJobDB.CreateJobs(jobs);

            ViewBag.aaa = string.Format("数据库插入：{0}", result);
            return View();
        }

        public ActionResult BKFMviewDeletejob()
        {
            tblJob job = new tblJob();
            job.chrLocalNumber = "Project1";
            job.chrONLNumber = "NA";
            //job.chrName = "Lufj Project";
            //job.chrDivision = "CI";
            //job.chrCountry = "China";
            //job.chrProductType = "aaa";
            job.inteProjectID = "123";

            int result = tblJobDB.DeleteJob(job);
            ViewBag.aaa = string.Format("数据库删除：{0}", result);
            return View();
        }
        
        public ActionResult BKFMviewUpdatejob()
        {
            tblJob job = new tblJob();
            job.chrLocalNumber = "Project AAA";
            //job.chrONLNumber = "NA";
            job.chrName = "Lufj Project AAA";
            job.chrDivision = "CR";
            job.chrCountry = "HongKong";
            job.chrProductType = null;
            job.inteProjectID ="123";
            job.blKeyClient = true;
            job.intComplexity = 111;
            job.dtmCreated = null;
            //job.dtmFinalQnrtoGO = DateTime.Now;
            job.blNeedTable = false;
            job.blNeedCoding = false;
            job.blNeedCleaning = false;

            int result = tblJobDB.UpdateJobByEProjectID(job);
            //int result = tblJobDB.UpdateJobByCustom(job);
            ViewBag.aaa = string.Format("数据库更新：{0}", result);
            return View();
        }
        #endregion

        #region ExportToExcel的MVC版本，部分代码待修改！
        public ActionResult ExportToExcelWithNPOI(string userid)
        {
            userid = "brian";
            bool result = RenderArrayListToExcel(userid);

            if (result)
            {
                ViewBag.Result = "导出Excel成功！";
            }
            else
            {
                ViewBag.Result = "导出Excel失败！";
            }
            //CreateWorkbook();

            return View();
        }

        //导出成xlsx格式（XSSFWorkbook）
        public bool RenderArrayListToExcel(string userid)
        {
            bool isok = false;
            ArrayList verticals = new ArrayList();
            tblProducerPermission pp = tblProducerPermissionDB.GetProducerPermission(userid);

            if (pp != null)
            {
                PropertyInfo[] props = pp.GetType().GetProperties();

                foreach (PropertyInfo prop in props)
                {
                    if (prop.GetValue(pp, null).ToString() == bool.TrueString)
                    {
                        //对应关系
                        //VerticalArr = Array("blAuto","blCPG","blEtailer","blFinance","blMedia","blRetailerPlus","blTechTelco","blNIP","blME")
                        //VerticalArr2 = Array("Auto", "CPG", "E-tailer", "Finance", "Media", "Retailer Plus", "Tech/Telco", "NIP", "ME")
                        string propname = null;
                        switch (prop.Name.ToLower())
                        {
                            case "blauto": propname = "Auto"; break;
                            case "blcpg": propname = "CPG"; break;
                            case "bletailer": propname = "E-tailer"; break;
                            case "blfinance": propname = "Finance"; break;
                            case "blmedia": propname = "Media"; break;
                            case "blnip": propname = "NIP"; break;
                            case "blretailerplus": propname = "Retailer Plus"; break;
                            case "bltechtelco": propname = "Tech/Telco"; break;
                            case "blme": propname = "ME"; break;
                            default: propname = null; break;
                        }

                        verticals.Add(propname);
                    }
                }
                //ArrayList转string[]
                string[] strverticals = (string[])verticals.ToArray(typeof(string));
                IList<tblQuotationSummary> qss = tblQuotationSummaryDB.SelectQuotationSummaryByVertical(strverticals);
                
                XSSFWorkbook workbook = new XSSFWorkbook();
                XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet("Summary");
                XSSFRow headerRow = (XSSFRow)sheet.CreateRow(0);


                bool hasheader = false;
                int rowIndex = 1;
                foreach (tblQuotationSummary qs in qss)
                {
                    PropertyInfo[] QSprops = qs.GetType().GetProperties();
                    XSSFRow dataRow = (XSSFRow)sheet.CreateRow(rowIndex);
                    int i = 0;
                    foreach (PropertyInfo qsprop in QSprops)
                    {
                        if (!hasheader)
                        {
                            headerRow.CreateCell(i).SetCellValue(qsprop.Name.ToString());
                        }
                        dataRow.CreateCell(i).SetCellValue(Convert.ToString(qsprop.GetValue(qs)));
                        i++;
                    }
                    hasheader = true;
                    rowIndex++;
                }

                using (MemoryStream ms = new MemoryStream())
                {
                    workbook.Write(ms);

                    Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", "Quotation.xlsx"));
                    Response.BinaryWrite(ms.ToArray());

                    isok = true;
                    //ms.Flush();
                    //ms.Close();
                    //ms.Dispose();

                    //将缓存中的内容立即显示出来，页面继续执行
                    //Response.Flush();
                    //输出内容，停止页面执行
                    Response.End();
                }
            }
            return isok;            
        }
              

        //导出简单的xls文件（HSSFWorkbook）
        public void CreateWorkbook()
        {
            HSSFWorkbook workbook = new HSSFWorkbook();
            MemoryStream ms = new MemoryStream();

            //新增sheet
            HSSFSheet sheet = (HSSFSheet)workbook.CreateSheet("我的sheet");
            //在sheet中加入内容
            sheet.CreateRow(0).CreateCell(0).SetCellValue("0");
            sheet.CreateRow(1).CreateCell(0).SetCellValue("1");
            sheet.CreateRow(2).CreateCell(0).SetCellValue("2");
            sheet.CreateRow(3).CreateCell(0).SetCellValue("3");
            sheet.CreateRow(4).CreateCell(0).SetCellValue("4");
            sheet.CreateRow(5).CreateCell(0).SetCellValue("5");

            workbook.Write(ms);
            Response.AddHeader("Content-Disposition", string.Format("attachment; filename=EmptyWorkbook.xls"));
            Response.BinaryWrite(ms.ToArray());

            workbook = null;
            ms.Close();
            ms.Dispose();
        }
        #endregion



        public ActionResult Program()
        {
            
            return View();
        }
    }
}