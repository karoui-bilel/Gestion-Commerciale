//------------------------------------------------------------------------------
// <auto-generated>
//     Ce code a été généré à partir d'un modèle.
//
//     Des modifications manuelles apportées à ce fichier peuvent conduire à un comportement inattendu de votre application.
//     Les modifications manuelles apportées à ce fichier sont remplacées si le code est régénéré.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ServeurWebApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class DOCENTETE
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DOCENTETE()
        {
            this.DOCLIGNE = new HashSet<DOCLIGNE>();
        }
    
        public int ID_PIECE { get; set; }
        public string DO_PIECE { get; set; }
        public Nullable<int> DO_TYPE { get; set; }
        public Nullable<int> ID_CLIENT { get; set; }
        public Nullable<System.DateTime> DO_DATE { get; set; }
    
        public virtual CLIENT CLIENT { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DOCLIGNE> DOCLIGNE { get; set; }
    }
}
