using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace ServeurWebApi.DTO
{
    [DataContract]
    public class ClientDTO
    {
        [DataMember]
        public int IdClient;

        [DataMember]
        public string Nom;

        [DataMember]
        public string Prenom;

        [DataMember]
        public string Client;
    }
}