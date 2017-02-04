using Sundear.Base.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MVCtest
{
    public partial class WebForm2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DateTime aaa = Request.Form["FinalQuestToGo"].ToDateTime();
            DateTime bbb = DateTime.MinValue;

            //string noString = NoString.Text;
            string hasString = HasString.Text;
            string pat = @"\d+";
            Regex r = new Regex(pat);
            Match m = r.Match(hasString);
            NoString.Text = m.Value;

            length.Text = m.Value.Length.ToString();
        }
    }
}