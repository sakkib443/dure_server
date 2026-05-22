import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { SiteContent } from '../app/modules/siteContent/siteContent.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

async function updateTheme() {
    try {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            console.error('❌ DATABASE_URL is not set in .env');
            process.exit(1);
        }

        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(dbUrl);
        console.log('✅ Connected to MongoDB.');

        console.log('🔍 Finding SiteContent document...');
        let content = await SiteContent.findOne({ _key: 'main' });

        if (!content) {
            console.log('❌ SiteContent document not found. Creating a new one...');
            content = await SiteContent.create({
                _key: 'main',
                theme: {
                    primaryColor: '#800000',
                    secondaryColor: '#E4525C',
                }
            });
        } else {
            console.log('🆙 Updating existing SiteContent theme...');
            content.theme = {
                ...content.theme,
                primaryColor: '#800000',
                secondaryColor: '#E4525C',
            };
            await content.save();
        }

        console.log('✅ Site theme successfully updated in database:');
        console.log(content.theme);

        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB.');
        process.exit(0);
    } catch (error: any) {
        console.error('❌ Error updating theme:', error.message);
        process.exit(1);
    }
}

updateTheme();
