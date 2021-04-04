import { Model, DataTypes, Op } from 'sequelize';
import validator from 'validator';
import { M } from '../helpers/only';
import { connection as conn } from '../kernel';

if (! conn)
    throw new Error("Connection doens't working");

const defaultExclude = ['password'];

class User extends Model {
    static async whereToken(jwtoken: string, exclude: Array<string> = defaultExclude): Promise<User | null> {
        return User.findOne({
            attributes: { exclude: exclude },
            where: {
                jwtoken: {
                    [Op.eq]: jwtoken,
                },
            },
        });
    }

    static async whereEmail(email: string, exclude: Array<string> = defaultExclude): Promise<User | null> {
        return User.findOne({
            attributes: { exclude: exclude },
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });
    }
};

User.init({
    name: {
        type: DataTypes.CITEXT,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    age: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
    },

    jwtoken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize: conn,
    modelName: 'User',
});

User.sync({ alter: true });

export interface UserData {
    name: string,
    email: string,
    password: string,
    age: string|number,
}

export default User;