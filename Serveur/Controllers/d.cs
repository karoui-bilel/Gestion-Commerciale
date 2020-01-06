using System.Web.Http;
using ServeurWebApi.DTO;

namespace ServeurWebApi.Controllers
{
    public interface d
    {
        IHttpActionResult DeleteLigneDetailsFacutre(int IdLigneFacture);
        IHttpActionResult GetFacture(int IdFacture);
        IHttpActionResult GetLignesFacture(int IdFacture);
        IHttpActionResult GetListContacts();
        IHttpActionResult GetListFacture();
        IHttpActionResult GetListProduits();
        IHttpActionResult SetLigneDetailsFacutre(LignesFactureDTO ligneFacture);
    }
}