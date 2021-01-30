using Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IUserActivityService
    {
        Task<List<UserActivityDTO>> GetAllUserActivities();

        Task<UserActivityDTO> AddUserActivity(UserActivityDTO userActivity);

        Task<bool> GetIfUserExists(UserActivityDTO userActivity);
    }
}
