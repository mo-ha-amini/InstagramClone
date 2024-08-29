using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Models;
using Oracle.ManagedDataAccess.Client;
using System.Data;
//using System.Data.SqlClient;

namespace Repository
{
    public interface IDatabaseConnection
    {
        Task<CustomActionResult<IDbConnection>> GetConnection();
    }
    public class DatabaseConnection : IDatabaseConnection
    {
        private IDbConnection _connection;
        private readonly DatabaseConnectionModel _connectionModel;

        public DatabaseConnection(IOptions<DatabaseConnectionModel> options)
        {
            _connectionModel = options.Value;
        }

        public async Task<CustomActionResult<IDbConnection>> GetConnection()
        {
            CustomActionResult<IDbConnection> result= new CustomActionResult<IDbConnection>();
            try
            {
                if(_connection == null)
                {
                    _connection = new SqlConnection(_connectionModel.ConnectionString);
                }
                result.IsSuccess = true;
                result.Data = _connection;  
            }
            catch (Exception ex)
            {

                result.IsSuccess = false;
                result.Message = "Error Connecting Database";
            }
            return result;
        }
    }
}
