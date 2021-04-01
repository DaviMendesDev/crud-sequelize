import { Model, DataTypes, Op } from 'sequelize';
import { connection as conn } from '../kernel';

if (! conn)
    throw new Error("Connection doens't working");

class User extends Model {
    static async whereToken(jwtoken: string): Promise<User | null> {
        return User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                jwtoken: {
                    [Op.eq]: jwtoken,
                },
            },
        });
    }
};

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrementIdentity: true,
    },

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

User.sync();

export default User;