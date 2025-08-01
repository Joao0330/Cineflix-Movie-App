import { FastifyInstance } from 'fastify';
import { registerUser } from './register';
import { loginUser } from './login';
import { logoutUser } from './logout';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { getCurrentUser } from './profile';
import { googleAuth } from './googleAuth';
import { googleConfig } from './googleConfig';
import { updateUsername } from './updateUsername';
import { uploadProfilePic } from './uploadProfilePic';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { getAllUsers } from './getAllUsers';
import { changeUserRole } from './changeUserRole';
import { verifyIfBanned } from '../../middlewares/verify-banned';
import { banUser } from './banUser';

export async function authRoutes(app: FastifyInstance) {
	app.post('/register', registerUser);
	app.post('/login', loginUser);
	app.post('/auth/google', googleAuth);
	app.post('/logout', logoutUser);
	app.get('/profile', { onRequest: [verifyJwt, verifyIfBanned] }, getCurrentUser);
	app.get('/auth/google/config', googleConfig);
	app.put('/update-username', { onRequest: [verifyJwt] }, updateUsername);
	app.post('/profile/picture', { onRequest: [verifyJwt, verifyIfBanned] }, uploadProfilePic);
	app.get('/users', { onRequest: [verifyJwt, verifyUserRole('ADMIN')] }, getAllUsers);
	app.put('/users/:userId/role', { onRequest: [verifyJwt, verifyUserRole('ADMIN')] }, changeUserRole);
	app.patch('/users/:userId/ban', { onRequest: [verifyJwt, verifyUserRole('ADMIN'), verifyIfBanned] }, banUser);
}
