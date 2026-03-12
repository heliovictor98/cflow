import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly defaultUser;
    login(dto: LoginDto): {
        token: string;
        username: string;
    };
}
