import { EditUserDialog } from '@/components/adminPanel/EditUserDialog';
import { useProfiles } from '@/hooks/useProfiles';

export const AdminPanel = () => {
	const { useProfileGetUsersQuery } = useProfiles();
	const { data: users = [], isLoading } = useProfileGetUsersQuery();

	return (
		<section className='adminPanel'>
			<div className='container-sm'>
				<h1>Admin Panel</h1>

				<div className='adminPanel__users'>
					<h2>Manage Users</h2>

					{isLoading ? (
						<div>Loading users...</div>
					) : (
						<div className='adminPanel__users-list'>
							{users.length > 0 ? (
								<ul>
									{users.map((user: User) => (
										<li key={user.id}>
											<article>
												<div>
													<img src={user.profile_picture_url || '/assets/userFallback.png'} alt={user.username} />
													<strong>{user.username}</strong>
												</div>
												<div>
													<span>Email: {user.email}</span>
												</div>
												<div>
													<span>Joined: {new Date(user.created_at).toLocaleDateString()}</span>
												</div>
												<div>
													<span>Role: {user.role}</span>
												</div>
												<div>Status: {user.is_banned ? <span className='banned'>Banned</span> : <span className='active'>Active</span>}</div>
											</article>
											<EditUserDialog user={user} />
										</li>
									))}
								</ul>
							) : (
								<p>No users found.</p>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};
