using ServeurWebApi.DAO;
using ServeurWebApi.DTO;
using ServeurWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ServeurWebApi.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [Authorize]
    public class FactureController : ApiController, d
    {
        IFactureRepository _repository;

        public FactureController(IFactureRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IHttpActionResult GetListFacture()
        {
            //Thread.Sleep(2000);
            var user = HttpContext.Current.User;
            return Ok(_repository.GetListFactureDTO());
        }

        [HttpGet]
        public IHttpActionResult GetListContacts()
        {

            return Ok(_repository.GetListClients());
        }

        [HttpGet]
        public IHttpActionResult GetFacture(int IdFacture)
        {

            return Ok(_repository.GetFacture(IdFacture));
        }

        [HttpGet]
        public IHttpActionResult GetLignesFacture(int IdFacture)
        {

            return Ok(_repository.GetListLignesDocument(IdFacture));
        }

        [HttpGet]
        public IHttpActionResult GetProduit(int IdProduit)
        {

            return Ok(_repository.GetProduit(IdProduit));
        }

        [HttpGet]
        public IHttpActionResult GetListProduits()
        {

            return Ok(_repository.GetListProduits());
        }

        [HttpPost]
        public IHttpActionResult SetLigneDetailsFacutre(LignesFactureDTO ligneFacture)
        {
            if (ligneFacture == null)
                return BadRequest("Invalid data.");


            _repository.SetLigneDocument(ligneFacture);

            return Ok(true);
        }

        [HttpDelete]
        public IHttpActionResult DeleteLigneDetailsFacutre(int IdLigne)
        {
            if (IdLigne == 0)
                return BadRequest("Invalid data.");


            _repository.DelLigneDocument(IdLigne);

            return Ok(true);
        }

        [HttpDelete]
        //[Route("Delete/{IdFacture}")]
        public IHttpActionResult DeleteFacutre(int IdFacture)
        {
            if (IdFacture == 0)
                return BadRequest("Invalid data.");


            _repository.DeleteFacutre(IdFacture);

            return Ok(true);
        }

        [HttpPost]
        public IHttpActionResult SetFacutre(FactureDTO Facture)
        {
            if (Facture == null)
                return BadRequest("Invalid data.");


            _repository.SetDocument(Facture);

            return Ok(true);
        }

    }
}
