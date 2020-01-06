using ServeurWebApi.DTO;
using ServeurWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServeurWebApi.DAO
{
    public class FactureDAO : IFactureRepository
    {
        public IList<FactureDTO> GetListFactureDTO()
        {
            IList<FactureDTO> listeDocuments = new List<FactureDTO>();

            using (var context = new DataBaseContext())
            {
                var list = context.ListeDocuments.ToList();
                foreach (var facture in list)
                {
                    listeDocuments.Add(
                        new FactureDTO
                        {
                            IdFacture = facture.ID_PIECE,
                            NoPiece = facture.DO_PIECE,
                            Client = facture.CLIENT != null ? string.Concat(facture.CLIENT.NOM, " ", facture.CLIENT.PRENOM) : "",
                            IdClient = facture.CLIENT != null ? facture.CLIENT.ID_CLIENT : 0,
                            DateFacture = facture.DO_DATE.HasValue ? facture.DO_DATE.Value.Date : (DateTime?)null,
                            MontantTTC = (decimal)facture.DOCLIGNE.Where(cc => cc.QTE != null && cc.PRIX != null).Sum(cc => cc.PRIX * cc.QTE * ((cc.TVA == null || cc.TVA == 0) ? 0 : (cc.TVA / 100)))
                        }
                    );
                };
            }

            return listeDocuments;
        }

        public FactureDTO GetFacture(int IdFacture)
        {
            using (var context = new DataBaseContext())
            {
                var facture = context.ListeDocuments.Where(cc => cc.ID_PIECE == IdFacture).Take(1).SingleOrDefault();

                return new FactureDTO
                {
                    IdFacture = facture.ID_PIECE,
                    NoPiece = facture.DO_PIECE,
                    Client = facture.CLIENT != null ? string.Concat(facture.CLIENT.NOM, " ", facture.CLIENT.PRENOM) : "",
                    IdClient = facture.CLIENT != null ? facture.CLIENT.ID_CLIENT : 0,
                    DateFacture = facture.DO_DATE.HasValue ? facture.DO_DATE.Value.Date : (DateTime?)null,
                    MontantTTC = (decimal)facture.DOCLIGNE.Where(cc => cc.QTE != null && cc.PRIX != null).Sum(cc => cc.PRIX * cc.QTE * ((cc.TVA == null || cc.TVA == 0) ? 0 : (cc.TVA / 100)))
                };
            }
        }

        public IList<ClientDTO> GetListClients()
        {
            IList<ClientDTO> listeClients = new List<ClientDTO>();

            using (var context = new DataBaseContext())
            {
                var list = context.ListeContacts.ToList();
                foreach (var client in list)
                {
                    listeClients.Add(
                        new ClientDTO
                        {
                            IdClient = client.ID_CLIENT,
                            Nom = client.NOM,
                            Prenom = client.PRENOM,
                            Client = string.Concat(client.NOM, " ", client.PRENOM)
                        }
                    );
                };
            }

            return listeClients;
        }

        public IList<ProduitDTO> GetListProduits()
        {
            IList<ProduitDTO> listeProduitDTO = new List<ProduitDTO>();

            using (var context = new DataBaseContext())
            {
                var list = context.ListeProduits.ToList();
                foreach (var produit in list)
                {
                    listeProduitDTO.Add(
                        new ProduitDTO
                        {
                            IdProduit = (int)produit.ID_PRODUIT,
                            Designation = produit.DESIGNATION ?? ""
                        }
                    );
                };
            }

            return listeProduitDTO;
        }

        public ProduitDTO GetProduit(int IdProduit)
        {
            using (var context = new DataBaseContext())
            {
                var produit = context.ListeProduits.Where(cc => cc.ID_PRODUIT == IdProduit).Take(1).SingleOrDefault();

                return new ProduitDTO
                {
                    IdProduit = (int)produit.ID_PRODUIT,
                    Designation = produit.DESIGNATION,
                    Prix = produit.PRIX,
                    TVA = produit.TVA
                };
            }
        }

        public IList<LignesFactureDTO> GetListLignesDocument(int IdFacture)
        {
            IList<LignesFactureDTO> listeLignesFactureDTO = new List<LignesFactureDTO>();

            using (var context = new DataBaseContext())
            {
                var list = context.ListeLignesDocuments.Where(cc => cc.ID_PIECE == IdFacture).ToList();
                foreach (var ligne in list)
                {
                    decimal HT = ligne.PRIX ?? 0 * ligne.QTE ?? 0;
                    listeLignesFactureDTO.Add(
                        new LignesFactureDTO
                        {
                            IdLigne = ligne.ID_LIGNE,
                            IdFacture = ligne.ID_PIECE,
                            IdProduit = ligne.ID_PRODUIT,
                            Designation = ligne.PRODUIT?.DESIGNATION ?? "",
                            Prix = ligne.PRIX,
                            MontantHT = HT,
                            Qte = ligne.QTE,
                            TVA = ligne.TVA,
                            MontantTTC = HT + ( ligne.TVA == 0 ? 0 : HT * (ligne.TVA / 100))
                        }
                    );
                };
            }

            return listeLignesFactureDTO;
        }

        public bool SetLigneDocument(LignesFactureDTO ligneFacture)
        {

            using (var context = new DataBaseContext())
            {
                DOCLIGNE docligne = context.ListeLignesDocuments.Where(cc => cc.ID_LIGNE == ligneFacture.IdLigne).Take(1).SingleOrDefault();
                if (docligne == null)
                {
                    docligne = new DOCLIGNE();
                    context.ListeLignesDocuments.Add(docligne);
                }

                docligne.ID_PIECE = ligneFacture.IdFacture;
                docligne.ID_PRODUIT = ligneFacture.IdProduit;
                docligne.PRIX = ligneFacture.Prix;
                docligne.QTE = ligneFacture.Qte;
                docligne.TVA = ligneFacture.TVA;
                docligne.DESIGNATION = ligneFacture.Designation;

                context.SaveChanges();
            }

            return true;
        }

        public bool DelLigneDocument(int idLigneFacture)
        {
            using (var context = new DataBaseContext())
            {
                DOCLIGNE docligne = context.ListeLignesDocuments.Where(cc => cc.ID_LIGNE == idLigneFacture).Take(1).SingleOrDefault();
                if (docligne != null)
                {
                    context.ListeLignesDocuments.Remove(docligne);
                    context.SaveChanges();
                }
            }
            return true;
        }

        public bool DeleteFacutre(int IdFacture)
        {
            using (var context = new DataBaseContext())
            {
                DOCENTETE docEntete = context.ListeDocuments.Where(cc => cc.ID_PIECE == IdFacture).Take(1).SingleOrDefault();
                if (docEntete != null)
                {
                    List<DOCLIGNE> doclignes = context.ListeLignesDocuments.Where(cc => cc.ID_PIECE == IdFacture).ToList();
                    foreach (DOCLIGNE docligne in doclignes)
                        context.ListeLignesDocuments.Remove(docligne);

                    context.ListeDocuments.Remove(docEntete);

                    context.SaveChanges();
                }
            }
            return true;
        }

        public bool SetDocument(FactureDTO Facture)
        {
            if (Facture == null)
                return false;

            using (var context = new DataBaseContext())
            {
                DOCENTETE docEntete = context.ListeDocuments.Where(cc => cc.ID_PIECE == Facture.IdFacture).Take(1).SingleOrDefault();
                if (docEntete == null)
                {
                    docEntete = new DOCENTETE();
                    context.ListeDocuments.Add(docEntete);
                }

                docEntete.ID_CLIENT = Facture.IdClient;
                docEntete.DO_DATE = Facture.DateFacture;
                docEntete.DO_PIECE = Facture.NoPiece;
              
                context.SaveChanges();
            }

            return true;
        }
    }
}