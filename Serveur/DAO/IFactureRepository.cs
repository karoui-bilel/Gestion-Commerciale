using ServeurWebApi.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServeurWebApi.DAO
{
    public interface IFactureRepository
    {
        IList<FactureDTO> GetListFactureDTO();

        FactureDTO GetFacture(int IdFacture);

        IList<ClientDTO> GetListClients();

        IList<ProduitDTO> GetListProduits();

        ProduitDTO GetProduit(int IdProduit);

        IList<LignesFactureDTO> GetListLignesDocument(int IdFacture);

        bool SetLigneDocument(LignesFactureDTO ligneFacture);

        bool DelLigneDocument(int idLigneFacture);

        bool DeleteFacutre(int IdFacture);
        bool SetDocument(FactureDTO Facture);
    }
}
