using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace ServeurWebApi.DTO
{
    [DataContract]
    public class FactureDTO
    {
        [DataMember]
        public int IdFacture;

        [DataMember]
        public string NoPiece;

        [DataMember]
        public DateTime? DateFacture;

        [DataMember]
        public string Client;

        [DataMember]
        public int IdClient;

        [DataMember]
        public decimal MontantTTC;
    }
}