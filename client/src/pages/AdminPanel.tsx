import { EditUserDialog } from '@/components/adminPanel/EditUserDialog';
import { Button } from '@/components/ui/button';
import { useProfiles } from '@/hooks/useProfiles';
import { Link } from 'react-router';

export const AdminPanel = () => {
	const { useProfileGetUsersQuery, banUserMutation } = useProfiles();
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
													<Link to={`/user/${user.id}`}>
														<strong>{user.username}</strong>
													</Link>
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
											<div>
												<EditUserDialog user={user} />
												{user.is_banned ? (
													<Button variant='secondary' className='cursor-pointer' onClick={() => banUserMutation.mutate({ userId: user.id, is_banned: false })}>
														Unban User
													</Button>
												) : (
													<Button disabled={user.role === 'ADMIN'} variant='destructive' className='cursor-pointer' onClick={() => banUserMutation.mutate({ userId: user.id, is_banned: true })}>
														Ban User
													</Button>
												)}
											</div>
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
