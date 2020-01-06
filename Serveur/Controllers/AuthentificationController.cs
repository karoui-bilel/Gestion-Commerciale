using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using ServeurWebApi.DAO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ServeurWebApi.Controllers
{
  
    public class AuthenticationModel
    {
        public string login { get; set; }
        public string password { get; set; }
    }

    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class AuthentificationController : ApiController
    {
        IAuthentificationRepository _repository;

        public AuthentificationController(IAuthentificationRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public IHttpActionResult GetToken([FromBody] AuthenticationModel model)
        {
            string login = model.login;
            string password = model.password;
            if (string.IsNullOrEmpty(login) || login != password)
                return BadRequest("Invalid data.");


            var token = _repository.CreateToken(login);
            //return the token
            return Ok(token);

        }

     
    }
}