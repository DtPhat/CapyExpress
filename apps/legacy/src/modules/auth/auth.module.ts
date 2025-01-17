import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AccountModule } from "../account/account.module";
dotenv.config();

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h', algorithm: 'HS256' },
        }),
        forwardRef(() => AccountModule),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService,
        }
    ],
    exports: [
        'AUTH_SERVICE',
    ]
})
export class AuthModule { }