using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace ServeurWebApi.DTO
{
    [DataContract]
    public class LignesFactureDTO
    {
        [DataMember]
        public int? IdFacture;

        [DataMember]
        public int? IdLigne;

        [DataMember]
        public int? IdProduit;

        [DataMember]
        public string Designation;

        [DataMember]
        public decimal? Prix;

        [DataMember]
        public decimal? Qte;

        [DataMember]
        public decimal? TVA;

        [DataMember]
        public decimal? MontantHT;

        [DataMember]
        public decimal? MontantTTC;
    }
}