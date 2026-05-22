import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../app/modules/user/user.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

async function makeAdmin(email: string) {
    try {
        await mongoose.connect(process.env.DATABASE_URL || '');
        console.log('Connected to DB...');

        const result = await User.findOneAndUpdate(
            { email: email.toLowerCase() },
            { $set: { role: 'admin' } },
            { new: true }
        );

        if (result) {
            console.log(`\n✅ Success! ${email} is now an Admin.`);
            console.log(`   User details: ${result.firstName} ${result.lastName}`);
        } else {
            console.log(`\n❌ Error: User with email ${email} not found.`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

const userEmail = 'admin@gmail.com'; 
makeAdmin(userEmail);
