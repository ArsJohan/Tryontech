using TryontechWebAPI.Models;

namespace TryontechWebAPI.Clases
{
    public class clsTallajeCliente
    {
        private TryontechContext DBTryOnTech = new TryontechContext();
        public TallajeCliente tallajeCliente { get; set; }
        public Cliente cliente { get; set; }

        public List<TallajeCliente> ConsultarTodos()
        {
            
            return DBTryOnTech.TallajeClientes
                    .OrderBy(p => p.IdCliente) // Se ordena por el id del cliente
                    .ToList();
        }
        public string Insertar()
        {
            try
            {
                if(Validar()) // Se valida que los datos sean validos
                {
                    DBTryOnTech.TallajeClientes.Add(tallajeCliente); // Se agrega la talla del cliente
                    DBTryOnTech.SaveChanges();
                    return "Tallaje del cliente agregado correctamente";
                }
                else
                {
                    return "Medidas inválidas. Por favor, verifica los valores ingresados.";
                }
            }
            catch (Exception ex)
            {
                return "Error al agregar la talla del cliente: " + ex.Message;
            }
        }
        public string Actualizar()
        {
            try
            {
                if (Validar()) // Se valida que los datos sean validos
                {
                    TallajeCliente tallajeCli = Consultar(tallajeCliente.Id); // Se verifica que existe en la base de datos
                    if (tallajeCli == null)
                    {
                        return "La talla del cliente no existe. No se puede actualizar";
                    }
                    DBTryOnTech.TallajeClientes.Update(tallajeCliente); // Se actualiza la talla del cliente
                    DBTryOnTech.SaveChanges();
                    return "Tallaje del cliente actualizado correctamente";
                }
                else
                {
                    return "Medidas inválidas. Por favor, verifica los valores ingresados.";
                }
            }
            catch (Exception ex)
            {
                return "Error al actualizar la talla del cliente: " + ex.Message;
            }

        }
        public string Eliminar(int Id)
        {
            try
            {
                TallajeCliente tallajeCli = Consultar(Id); // Se verifica que existe en la base de datos
                if (tallajeCli == null)
                {
                    return "La talla del cliente no existe. No se puede eliminar";
                }
                DBTryOnTech.TallajeClientes.Remove(tallajeCli); // Se elimina la talla del cliente
                DBTryOnTech.SaveChanges();
                return "Tallaje del cliente eliminado correctamente";
            }
            catch (Exception ex)
            {
                return "Error al eliminar la talla del cliente: " + ex.Message;
            }

        }
        public TallajeCliente Consultar(int Id)
        {
            return DBTryOnTech.TallajeClientes.FirstOrDefault(p => p.Id == Id); // Se verifica que existe en la base de datos

        }
        public Cliente ConsultarCliente(int? Id)
        {
            return DBTryOnTech.Clientes.FirstOrDefault(p => p.Id == Id); // Se verifica que existe en la base de datos

        }
        public bool Validar()
        {
            cliente = ConsultarCliente(tallajeCliente.IdCliente);
            try
            {
                string sexo = cliente.Sexo;
                if (ValidarPecho(sexo) && ValidarBrazo(sexo) && ValidarCuello(sexo) && ValidarCintura(sexo) && ValidarCadera(sexo) && ValidarPierna(sexo) && ValidarHombros(sexo))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
                //return "Error al validar los datos de la talla del cliente: " + ex.Message;
            }
            
        }
        public bool ValidarPecho(string sexo)
        {
            if (sexo == "femenino" || sexo == "Femenino")
            {
                if(tallajeCliente.Pecho < 68 || tallajeCliente.Pecho > 188)
                {
                    return false;
                }
            }
            else
            {
                if (tallajeCliente.Pecho < 71 || tallajeCliente.Pecho > 152)
                {
                    return false;
                }
            }
            return true;
        }
        public bool ValidarBrazo(string sexo)
        {
            if (sexo == "femenino" || sexo == "Femenino")
            {
                if (tallajeCliente.LargoBrazo < 18 || tallajeCliente.LargoBrazo > 51)
                {
                    return false;
                }
            }
            else
            {
                if (tallajeCliente.LargoBrazo < 23 || tallajeCliente.LargoBrazo > 61)
                {
                    return false;
                }
            }
            return true;
        }
        public bool ValidarCuello(string sexo)
        {
            if (sexo == "femenino" || sexo == "Femenino")
            {
                if (tallajeCliente.Cuello < 28 || tallajeCliente.Cuello > 46)
                {
                    return false;
                }
            }
            else
            {
                if (tallajeCliente.Cuello < 33 || tallajeCliente.Cuello > 51)
                {
                    return false;
                }
            }
            return true;
        }
        public bool ValidarCintura(string sexo)
        {
            if (sexo == "femenino" || sexo == "Femenino")
            {
                if (tallajeCliente.Cintura < 50 || tallajeCliente.Cintura > 150)
                {
                    return false;
                }
            }
            else
            {
                if (tallajeCliente.Cintura < 60 || tallajeCliente.Cintura > 160)
                {
                    return false;
                }
            }
            return true;
        }
        public bool ValidarCadera(string sexo)
        {
            if (sexo == "femenino" || sexo == "Femenino")
            {
                if (tallajeCliente.Cadera < 56 || tallajeCliente.Cadera > 152)
                {
                    return false;
                }
            }
            else
            {
                if (tallajeCliente.Cadera < 71 || tallajeCliente.Cadera > 152)
                {
                    return false;
                }
            }
            return true;
        }
        public bool ValidarPierna(string sexo)
        {
            if (sexo == "femenino" || sexo == "Femenino")
            {
                if (tallajeCliente.LargoPierna < 61 || tallajeCliente.LargoPierna > 97)
                {
                    return false;
                }
            }
            else
            {
                if (tallajeCliente.LargoPierna < 66 || tallajeCliente.LargoPierna > 102)
                {
                    return false;
                }
            }
            return true;
        }
        public bool ValidarHombros(string sexo)
        {
            if (sexo == "femenino" || sexo == "Femenino")
            {
                if (tallajeCliente.Hombros < 36 || tallajeCliente.Hombros > 56)
                {
                    return false;
                }
            }
            else
            {
                if (tallajeCliente.Hombros < 41 || tallajeCliente.Hombros > 61)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
