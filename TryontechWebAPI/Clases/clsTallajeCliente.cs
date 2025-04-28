using TryontechWebAPI.Models;

namespace TryontechWebAPI.Clases
{
    public class clsTallajeCliente
    {
        private TryontechContext DBTryOnTech = new TryontechContext();
        public TallajeClienteDTO tallajeCliente { get; set; }
        public Cliente cliente { get; set; }
        private TallajeCliente MapToEntity(TallajeClienteDTO dto)
        {
            return new TallajeCliente
            {
                Id = dto.Id,
                Hombros = dto.Hombros,
                Pecho = dto.Pecho,
                Cintura = dto.Cintura,
                Cadera = dto.Cadera,
                LargoPierna = dto.LargoPierna,
                Cuello = dto.Cuello,
                LargoBrazo = dto.LargoBrazo,
                Peso = dto.Peso,
                Altura = dto.Altura,
                IdCliente = dto.IdCliente
            };
        }

        public List<TallajeCliente> ConsultarTodos()
        {
            return DBTryOnTech.TallajeClientes
                    .OrderBy(p => p.IdCliente) // Se ordena por el id del cliente
                    .ToList();
        }
        public string Insertar(int IdCliente)
        {
            try
            {
                tallajeCliente.IdCliente = IdCliente; // Se asigna el id del cliente al tallaje
                var tallajeClienteEntidad = MapToEntity(tallajeCliente); // Se mapea el DTO a la entidad

                if (Validar()) // Se valida que los datos sean validos
                {
                    DBTryOnTech.TallajeClientes.Add(tallajeClienteEntidad); // Se agrega la talla del cliente
                    DBTryOnTech.SaveChanges();
                    return "Customer measurements successfully added.";
                }
                else
                {
                    return "Incorrect measurements. Please double-check the values.";
                }
            }
            catch (Exception ex)
            {
                return "Couldn’t save size details: " + ex.Message;
            }
        }
        public string Actualizar()
        {
            try
            {
                var tallajeClienteEntidad = MapToEntity(tallajeCliente); // Se mapea el DTO a la entidad
                if (Validar()) // Se valida que los datos sean validos
                {
                    TallajeCliente tallajeCli = Consultar(tallajeCliente.Id); // Se verifica que existe en la base de datos
                    if (tallajeCli == null)
                    {
                        return "Measurements not found. Update failed.";
                    }
                    DBTryOnTech.TallajeClientes.Update(tallajeClienteEntidad); // Se actualiza la talla del cliente
                    DBTryOnTech.SaveChanges();
                    return "Client measurements sucessfully updated";
                }
                else
                {
                    return "Incorrect measurements. Please double-check the values.";
                }
            }
            catch (Exception ex)
            {
                return "Update failed: " + ex.Message;
            }

        }
        public string Eliminar(int Id)
        {
            try
            {
                TallajeCliente tallajeCli = Consultar(Id); // Se verifica que existe en la base de datos
                if (tallajeCli == null)
                {
                    return "Measurements not found. Deletion failed.";
                }
                DBTryOnTech.TallajeClientes.Remove(tallajeCli); // Se elimina la talla del cliente
                DBTryOnTech.SaveChanges();
                return "Measurements successfully deleted";
            }
            catch (Exception ex)
            {
                return "Couldn't remove client measurements:" + ex.Message;
            }

        }
        public TallajeCliente Consultar(int Id)
        {
            return DBTryOnTech.TallajeClientes.FirstOrDefault(p => p.Id == Id); // Se verifica que existe en la base de datos
        }
        public string CalcularTipoCuerpo(int IdCliente)
        {
            try
            {
                cliente = DBTryOnTech.Clientes.FirstOrDefault(p => p.Id == IdCliente); // Se obtiene el cliente del tallaje

                if (cliente == null)
                {
                    return "Client not found"; // Cliente no encontrado
                }

                if (cliente.Sexo == "Female")
                {
                    // Se validan las condiciones para calcular el tipo de cuerpo de mujer

                    float? razonPechoCadera = tallajeCliente.Pecho / tallajeCliente.Cadera;
                    if (razonPechoCadera >= 0.9f && razonPechoCadera <= 1.1f &&
                        (tallajeCliente.Pecho / tallajeCliente.Cintura) >= 1.2f && (tallajeCliente.Cadera / tallajeCliente.Cintura) >= 1.2f)
                    {
                        return "Hourglass";
                    }
                    else if ((tallajeCliente.Pecho / tallajeCliente.Cadera) >= 1.05f)
                    {
                        return "Inverted Triangle";
                    }
                    else if ((tallajeCliente.Cadera / tallajeCliente.Pecho) >= 1.15f)
                    {
                        return "Triangle";
                    }
                    else if (tallajeCliente.Cintura >= tallajeCliente.Hombros && tallajeCliente.Cintura >= tallajeCliente.Pecho && tallajeCliente.Cintura >= tallajeCliente.Cadera)
                    {
                        float? promedioOtras = (tallajeCliente.Hombros + tallajeCliente.Pecho + tallajeCliente.Cadera) / 3;
                        if ((tallajeCliente.Cintura / promedioOtras) >= 1.10f)
                            return "Oval";
                        else
                            return "Rectangle";
                    }
                    else
                    {
                        return "Rectangle";
                    }
                }
                else
                {
                    // Se validan las condiciones para calcular el tipo de cuerpo de hombre

                    if ((tallajeCliente.Pecho / tallajeCliente.Cadera >= 1.12f) && (tallajeCliente.Pecho / tallajeCliente.Cintura >= 1.15f))
                    {
                        return "Inverted Triangle";
                    }
                    else if (tallajeCliente.Cadera / tallajeCliente.Pecho >= 1.15f)
                    {
                        return "Triangle";
                    }
                    else if ((tallajeCliente.Hombros + tallajeCliente.Pecho) / (tallajeCliente.Cadera + tallajeCliente.Cintura) >= 1.10f)
                    {
                        return "Trapezoid";
                    }
                    else if ((tallajeCliente.Cintura >= tallajeCliente.Hombros && tallajeCliente.Cintura >= tallajeCliente.Pecho && tallajeCliente.Cintura >= tallajeCliente.Cadera) &&
                             (tallajeCliente.Cintura / tallajeCliente.Hombros >= 1.10f && tallajeCliente.Cintura / tallajeCliente.Pecho >= 1.10 && tallajeCliente.Cintura / tallajeCliente.Cadera >= 1.10f))
                    {
                        return "Oval";
                    }
                    else
                    {
                        return "Rectangle";
                    }
                }
            }
            catch (Exception ex)
            {
                return "Failed to analyze body shape: " + ex.Message;
            }
        }
        public bool Validar()
        {
            try
            {
                cliente = DBTryOnTech.Clientes.FirstOrDefault(p => p.Id == tallajeCliente.IdCliente); // Se obtiene el cliente del tallaje
                if (cliente == null)
                {
                    return false; // Cliente no encontrado
                }
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
