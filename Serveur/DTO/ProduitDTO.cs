using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace ServeurWebApi.DTO
{
    [DataContract]
    public class ProduitDTO
    {
        [DataMember]
        public int IdProduit;

        [DataMember]
        public string Designation;

        [DataMember]
        public decimal? Prix;

        [DataMember]
        public decimal? TVA;
    }
}