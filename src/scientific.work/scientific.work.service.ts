import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScientificWorkEntity } from '../entities/scientific.work.entity';
import { Like, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { WorkDto } from './dto/work.dto';
import { KeyWordEntity } from '../entities/key.word.entity';
import { SourceEntity } from '../entities/sources.entity';

@Injectable()
export class ScientificWorkService {
  constructor(@InjectRepository(ScientificWorkEntity)
              private readonly scientificWorkRepository: Repository<ScientificWorkEntity>,
              @InjectRepository(UserEntity)
              private readonly userRepository: Repository<UserEntity>,
              @InjectRepository(KeyWordEntity)
              private readonly keyWordRepository: Repository<KeyWordEntity>,
              @InjectRepository(SourceEntity)
              private readonly sourceRepository: Repository<SourceEntity>) {
  }

  async getOwn(userId: number): Promise<ScientificWorkEntity[]> {
    const result = await this.scientificWorkRepository.find({
      relations: ['sources', 'keyWords', 'user'],
      where: {
        user: {
          id: userId,
        },
      },
    });

    return result;
  }

  async findByText(text: string): Promise<ScientificWorkEntity[]> {
    return this.scientificWorkRepository.createQueryBuilder('sw')
      .where('LOWER(CONCAT_WS(sw.actuals, sw."aimsAndTasks", sw.conclusions,\n' +
        '        sw.introduction, sw."mainPart", sw.overview, sw."programImplementation")) LIKE :text', {text: `%${text}%`})
      .getMany();
  }

  async findByKeyWord(keyWord: string): Promise<ScientificWorkEntity[]> {
    const result = await this.keyWordRepository.findOne(
      {
        relations: ['scientificWorks'],
        where: {
          title: Like('%' + keyWord + '%'),
        },
      },
    );

    if (!result || !result.scientificWorks) {
      throw new Error('Works not found');
    }

    return result.scientificWorks;

  }

  async findBySource(source: string): Promise<ScientificWorkEntity[]> {
    const result = await this.sourceRepository.findOne({
      relations: ['scientificWork'],
      where: {
        link: Like('%' + source + '%'),
      },
    });

    if (!result || !result.scientificWork) {
      throw new Error('Works not found');
    }

    return result.scientificWork;
  }

  async create(work: WorkDto, userId: number) {
    const user = await this.getUserById(userId);

    const workEntity = new ScientificWorkEntity();
    workEntity.programImplementation = work.programImplementation;
    workEntity.mainPart = work.mainPart;
    workEntity.overview = work.overview;
    workEntity.conclusions = work.conclusions;
    workEntity.introduction = work.introduction;
    workEntity.aimsAndTasks = work.aimsAndTasks;
    workEntity.actuals = work.actuals;

    workEntity.user = user;

    workEntity.keyWords = work.keyWords.map(k => {
      const keyEntity = new KeyWordEntity();
      keyEntity.title = k.title;
      return keyEntity;
    });

    workEntity.sources = work.sources.map(s => {
      const sourceEntity = new SourceEntity();
      sourceEntity.link = s.link;
      return sourceEntity;
    });

    return this.scientificWorkRepository.save(workEntity);
  }

  async update(work: WorkDto, userId: number, workId: number) {
    const currentWork = await this.scientificWorkRepository.findOne({
      loadEagerRelations: true,
      where: {id: workId},
    });

    if (!currentWork) {
      throw new Error('No work with this id');
    }

    currentWork.actuals = work.actuals || currentWork.actuals;
    currentWork.aimsAndTasks = work.aimsAndTasks || currentWork.aimsAndTasks;
    currentWork.introduction = work.introduction || currentWork.introduction;
    currentWork.conclusions = work.conclusions || currentWork.conclusions;
    currentWork.overview = work.overview || currentWork.overview;
    currentWork.mainPart = work.mainPart || currentWork.mainPart;
    currentWork.programImplementation = work.programImplementation || currentWork.programImplementation;

    if (work.sources) {
      currentWork.sources = work.sources.map(s => {
        const sourceEntity = new SourceEntity();
        sourceEntity.link = s.link;
        return sourceEntity;
      });
    }

    if (work.keyWords) {
      currentWork.keyWords = work.keyWords.map(k => {
        const keyEntity = new KeyWordEntity();
        keyEntity.title = k.title;
        return keyEntity;
      });
    }

    return this.scientificWorkRepository.save(currentWork);

  }

  private async getUserById(id: number) {
    return this.userRepository.findOne({where: {id}});
  }

}
