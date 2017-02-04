<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AjaxUpdatePanel.aspx.cs" Inherits="MVCtest.NotMVC.AjaxUpdatePanel" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajax" %>
<%--Online Demo https://ajaxcontroltoolkit.devexpress.com/Tabs/Tabs.aspx--%>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server" />
        <asp:UpdatePanel ID="DemoUpdatePanel" runat="server" UpdateMode="Conditional">
            <ContentTemplate>
                <ajax:TabContainer ID="Tabs" runat="server"  ActiveTabIndex="1">
                    <ajax:TabPanel runat="server" ID="TabUploadFiles" HeaderText="Upload Files">
                        <ContentTemplate>
                            <asp:UpdatePanel></asp:UpdatePanel>

                        </ContentTemplate>
                    </ajax:TabPanel>
                </ajax:TabContainer>
            </ContentTemplate>
        </asp:UpdatePanel>
    
    </div>
    </form>
</body>
</html>
