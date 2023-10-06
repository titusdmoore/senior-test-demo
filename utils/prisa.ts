import { PrismaClient } from '@prisma/client';

let _prisma: any;

export default function prisma() {
    if (!_prisma) {
        _prisma = new PrismaClient();
    }
    return _prisma;
}
