<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AjaxGetWholeHtml.aspx.cs" Inherits="MVCtest.NotMVC.AjaxGetWholeHtml" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>AjaxGetWholeHtml</title>    
    <script src="../Scripts/jquery-1.10.2.min.js"></script> 
      <script type="text/javascript">
          //这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码。
          //如果在文档没有完全加载之前就运行函数，操作可能失败
          //$(document).ready(function () {
              function aaa() {
                  $.ajax({
                      url: "http://localhost:3902/Home/Index",
                      dataType: "script",
                      //async:false,
                      success: function (data) {
                          alert(data);

                      }
                  });
              }
          //});
    </script>  
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <h1>AjaxGetWholeHtml</h1>
    </div>
        <input id="Button1" type="button" value="button" onclick="aaa();" />
        <div id="div1"></div>
    </form>
</body>
</html>
