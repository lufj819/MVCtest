<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="正则表达式.aspx.cs" Inherits="MVCtest.WebForm2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title> 
</head>
<body>
    <form id="form1" runat="server">
        <div>
            包含字符：<asp:TextBox ID="HasString" runat="server"></asp:TextBox><input id="Submit1" type="submit" value="submit" /><br />
            纯数字：<asp:Label ID="NoString" runat="server" Text=""></asp:Label>
            长度：<asp:Label ID="length" runat="server" Text=""></asp:Label>
        </div>
    </form>
</body>
</html>
