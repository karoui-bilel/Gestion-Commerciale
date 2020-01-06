using ServeurWebApi.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ServeurWebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // New code
            config.EnableCors();

            // Web API routes
            config.MapHttpAttributeRoutes();

            //Web API routes
            config.MessageHandlers.Add(new TokenValidationHandler());

            config.Routes.MapHttpRoute(
                "DefaultApiWithAction", "Api/{controller}/{action}");

            config.Routes.MapHttpRoute(
                name: "DefaultApiWithID",
                routeTemplate: "api/{controller}/{id}",
                defaults: null
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
            name: "GetToken",
            routeTemplate: "api/{controller}/{login}/{password}"
        );
        }
    }
}
