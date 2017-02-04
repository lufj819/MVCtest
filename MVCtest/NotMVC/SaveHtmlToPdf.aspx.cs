using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using iTextSharp;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;
using System.Drawing;

namespace MVCtest.NotMVC
{
    public partial class SaveHtmlToPdf : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var path = "";

            //var doc = new Document();
            //var writer = PdfWriter.GetInstance(doc, new FileStream(path, FileMode.Create));
            //doc.Open();

            //byte[] array = System.Text.Encoding.UTF8.GetBytes();

            //Bitmap bitmap;
            //string url;
            //int w = 760, h = 900;

            //p

            //Anchor ancl = new Anchor("BKFMViewForm2");
            //ancl.Reference = "http://10.250.32.207:84/ClientService/BKFMViewForm2?id=7977";
            //ancl.Name = "BKFM";
        }
    }
}