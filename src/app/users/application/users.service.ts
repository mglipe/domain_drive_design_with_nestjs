import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository, type IUserRepository } from '../domain/user.repository';
import { CreateUserInput, UpdateUserInput, UserEntity, UserProps } from '../domain/user.entity';
import { MatriculaService } from '../domain/services/matricula-generator.service';


@Injectable()
export class UsersService {
   constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly matriculaService: MatriculaService
  ) {}

  async getUsers(): Promise<{ users: (UserEntity | null)[] | null }> {
    const users = await this.userRepository.findAll();

    return { users };
  }

  async getUserById(userId: string): Promise<{ user: UserEntity }> {
    const user = await this.userRepository.findById( userId );

    if (!user) {
      throw new NotFoundException('User não encontrado');
    }
    return { user };
  }

  async createUser(dto: CreateUserInput): Promise<{ user: UserEntity }> {
    const userHasEmail = await this.userRepository.findByEmail(dto.email)
    if(userHasEmail) userHasEmail.emailExist(userHasEmail.email);

    const userHasCpf = await this.userRepository.findByCPF(dto.cpf);
    if(userHasCpf) userHasCpf.cpfExist(dto.cpf);

    const matricula = await this.matriculaService.generate();
    const newUser = UserEntity.create(dto, matricula);
  
    await this.userRepository.createUser(newUser);
    
    return { user: newUser};
  }

  async updateUser(userId: string, dto: UpdateUserInput ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new NotFoundException('resource not found');
    }

    const updatedUser = user.update(dto)
    await this.userRepository.updateUser(userId, updatedUser);
  }
     
}
