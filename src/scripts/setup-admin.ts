import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../app/modules/user/user.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

async function setupAdmin() {
    try {
        await mongoose.connect(process.env.DATABASE_URL || '');
        console.log('Connected to DB\n');

        // Check if admin@jhamdani.com exists
        const existing = await User.findOne({ email: 'admin@jhamdani.com' });
        
        if (existing) {
            console.log('✅ admin@jhamdani.com already exists!');
            console.log(`   Role: ${existing.role}`);
            console.log(`   Status: ${existing.status}`);
            
            // Make sure it's admin role
            if (existing.role !== 'admin') {
                existing.role = 'admin';
                await existing.save();
                console.log('   → Updated role to admin!');
            }
        } else {
            // Create new admin
            const admin = await User.create({
                email: 'admin@jhamdani.com',
                password: 'admin@jhamdani.com',
                firstName: 'Admin',
                lastName: 'Chutli',
                role: 'admin',
                status: 'active',
                isEmailVerified: true,
            });
            console.log('✅ Admin created!');
            console.log(`   Email: admin@jhamdani.com`);
            console.log(`   Password: admin@jhamdani.com`);
            console.log(`   Role: ${admin.role}`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

setupAdmin();
