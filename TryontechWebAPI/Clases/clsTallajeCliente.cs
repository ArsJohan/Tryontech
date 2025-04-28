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
        public string CalcularTipoCuerpo()
        {
            try
            {
                clsCliente client = new clsCliente();
                cliente = client.ConsultarCliente(tallajeCliente.IdCliente); // Se obtiene el cliente del tallaje

                if (cliente.Sexo == "Female")
                {
                    // Se validan las condiciones para calcular el tipo de cuerpo de mujer

                    float? razonPechoCadera = tallajeCliente.Pecho / tallajeCliente.Cadera;
                    if (razonPechoCadera >= 0.9f && razonPechoCadera <= 1.1f &&
                        (tallajeCliente.Pecho / tallajeCliente.Cintura) >= 1.2f && (tallajeCliente.Cadera / tallajeCliente.Cintura) >= 1.2f)
                    {
                        return "Reloj de arena";
                    }
                    else if ((tallajeCliente.Pecho / tallajeCliente.Cadera) >= 1.05f)
                    {
                        return "Triángulo invertido";
                    }
                    else if ((tallajeCliente.Cadera / tallajeCliente.Pecho) >= 1.15f)
                    {
                        return "Triángulo";
                    }
                    else if (tallajeCliente.Cintura >= tallajeCliente.Hombros && tallajeCliente.Cintura >= tallajeCliente.Pecho && tallajeCliente.Cintura >= tallajeCliente.Cadera)
                    {
                        float? promedioOtras = (tallajeCliente.Hombros + tallajeCliente.Pecho + tallajeCliente.Cadera) / 3;
                        if ((tallajeCliente.Cintura / promedioOtras) >= 1.10f)
                            return "Ovalado";
                        else
                            return "Rectángulo";
                    }
                    else
                    {
                        return "Rectángulo";
                    }
                }
                else
                {
                    // Se validan las condiciones para calcular el tipo de cuerpo de hombre

                    if ((tallajeCliente.Pecho / tallajeCliente.Cadera >= 1.12f) && (tallajeCliente.Pecho / tallajeCliente.Cintura >= 1.15f))
                    {
                        return "Triángulo Invertido";
                    }
                    else if (tallajeCliente.Cadera / tallajeCliente.Pecho >= 1.15f)
                    {
                        return "Triángulo";
                    }
                    else if ((tallajeCliente.Hombros + tallajeCliente.Pecho) / (tallajeCliente.Cadera + tallajeCliente.Cintura) >= 1.10f)
                    {
                        return "Trapecio";
                    }
                    else if ((tallajeCliente.Cintura >= tallajeCliente.Hombros && tallajeCliente.Cintura >= tallajeCliente.Pecho && tallajeCliente.Cintura >= tallajeCliente.Cadera) &&
                             (tallajeCliente.Cintura / tallajeCliente.Hombros >= 1.10f && tallajeCliente.Cintura / tallajeCliente.Pecho >= 1.10 && tallajeCliente.Cintura / tallajeCliente.Cadera >= 1.10f))
                    {
                        return "Ovalado";
                    }
                    else
                    {
                        return "Rectángulo";
                    }
                }
            }
            catch (Exception ex)
            {
                return "Error al calcular el tipo de cuerpo: " + ex.Message;
            }
        }
        public bool Validar()
        {
            try
            {
                clsCliente client = new clsCliente();
                cliente = client.ConsultarCliente(tallajeCliente.IdCliente); // Se obtiene el cliente del tallaje

                string sexo = cliente.Sexo;
                if (ValidarPecho(sexo) && 
                    ValidarBrazo(sexo) && 
                    ValidarCuello(sexo) && 
                    ValidarCintura(sexo) && // Se valida si las medidas están dentro del rango adecuado
                    ValidarCadera(sexo) && 
                    ValidarPierna(sexo) && 
                    ValidarHombros(sexo))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }
        public bool ValidarPecho(string sexo)
        {
            if (cliente.Sexo == "Female")
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
            if (cliente.Sexo == "Female")
            {
                if (tallajeCliente.LargoBrazo < 50 || tallajeCliente.LargoBrazo > 75)
                {
                    return false;
                }
            }
            else
            {
                if (tallajeCliente.LargoBrazo < 55 || tallajeCliente.LargoBrazo > 85)
                {
                    return false;
                }
            }
            return true;
        }
        public bool ValidarCuello(string sexo)
        {
            if (cliente.Sexo == "Female")
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
            if (cliente.Sexo == "Female")
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
            if (cliente.Sexo == "Female")
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
            if (cliente.Sexo == "Female")
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
            if (cliente.Sexo == "Female")
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
