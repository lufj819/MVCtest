using MVCtest.DBAccess;
using MVCtest.Models;
using NPOI.XSSF.UserModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MVCtest.Controllers
{
    //Controller跨域调用
    [EnableCors("*", "*", "*")]
    public class ExportToExcelController : ApiController
    {
        // GET api/<controller>
        //WebAPI版本的导出excel
        //推荐使用IHttpActionResult作为返回值
        public IHttpActionResult GetExportToExcel(string userid)
        {
            var bytememory = RenderArrayListToExcel(userid);
            if (bytememory != null)
            {
                HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                //result = new HttpResponseMessage();
                result.Content = new ByteArrayContent(bytememory);

                result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = "Quotation.xlsx";
                return ResponseMessage(result);
            }

            return NotFound();
        }

        public IHttpActionResult GetExportToExcel()
        {
            return NotFound();
        }

        //GET actionapi/<controller>/<action>        
        public string QuotationExport()
        {
            return "YYYY";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

        private byte[] RenderArrayListToExcel(string userid)
        {
            byte[] result = null;
            ArrayList verticals = new ArrayList();
            tblProducerPermission pp = tblProducerPermissionDB.GetProducerPermission(userid.Trim());

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
                    result = ms.ToArray();
                }
            }
            return result;
        }
    }
}