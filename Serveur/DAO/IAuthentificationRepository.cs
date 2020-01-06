using ServeurWebApi.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServeurWebApi.DAO
{
    public interface IAuthentificationRepository
    {
         string CreateToken(string login);
    }
}
