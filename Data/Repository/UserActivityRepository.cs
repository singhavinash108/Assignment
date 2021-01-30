using Data.DataContext;
using Domain.Interface;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
//using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class UserActivityRepository : IUserActivityRepository
    {
        private readonly AppDbContext _appDbContext;
        public UserActivityRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<UserActivity> AddUserActivity(UserActivity userActivity)
        {
            _appDbContext.UserActivities.Add(userActivity);
            await _appDbContext.SaveChangesAsync();
            return userActivity;
        }

        public async Task<List<UserActivity>> GetAllUserActivities()
        {
            var result = await _appDbContext.UserActivities.ToListAsync();
            return result;
        }

        public async Task<bool> GetIfUserExists(UserActivity userActivity)
        {
            var result = await _appDbContext.UserActivities.FirstOrDefaultAsync(x => x.Email.ToLower() == userActivity.Email.ToLower());
            return (result!=null);
        }

    }
}
