using ServeurWebApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ServeurWebApi.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext() : base("GestcomEntities") { }
        public DbSet<CLIENT> ListeContacts { get; set; }
        public DbSet<DOCENTETE> ListeDocuments { get; set; }
        public DbSet<DOCLIGNE> ListeLignesDocuments { get; set; }
        public DbSet<PRODUIT> ListeProduits { get; set; }
    }
}