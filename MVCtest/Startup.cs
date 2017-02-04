using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MVCtest.Startup))]
namespace MVCtest
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
