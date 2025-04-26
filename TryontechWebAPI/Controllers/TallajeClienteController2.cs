//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using TryontechWebAPI.Clases;
//using TryontechWebAPI.Models;

//namespace TryontechWebAPI.Controllers
//{
//    [ApiController]
//    [Route("[controller]/[action]")]
//    [Authorize]
//    public class TallajeClienteController2 : Controller
//    {
//        [HttpPost]
//        [Route("Insertar")]
//        public string Insertar([FromBody] TallajeCliente tallajecliente)
//        {
//            clsTallajeCliente Tallajecliente = new clsTallajeCliente();
//            Tallajecliente.tallajeCliente = tallajecliente;
//            return Tallajecliente.Insertar();
//        }
//    }
//}
