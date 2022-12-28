-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "loginType" TEXT DEFAULT 'email',
    "password" TEXT,
    "email" TEXT,
    "name" TEXT,
    "username" TEXT,
    "stripeCustomerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "authToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hitter" (
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "games" INTEGER NOT NULL,
    "plateAppearances" INTEGER NOT NULL,
    "atBats" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "doubles" INTEGER NOT NULL,
    "triples" INTEGER NOT NULL,
    "homeruns" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "rbi" INTEGER NOT NULL,
    "walks" INTEGER NOT NULL,
    "strikeouts" INTEGER NOT NULL,
    "hbp" INTEGER NOT NULL,
    "stolenBases" INTEGER NOT NULL,
    "cs" INTEGER NOT NULL,
    "avg" DOUBLE PRECISION NOT NULL,
    "obp" DOUBLE PRECISION NOT NULL,
    "slugging" DOUBLE PRECISION NOT NULL,
    "ops" DOUBLE PRECISION NOT NULL,
    "wOBA" DOUBLE PRECISION NOT NULL,
    "wRCplus" INTEGER NOT NULL,
    "BsR" DOUBLE PRECISION NOT NULL,
    "fld" DOUBLE PRECISION NOT NULL,
    "off" DOUBLE PRECISION NOT NULL,
    "def" DOUBLE PRECISION NOT NULL,
    "war" DOUBLE PRECISION NOT NULL,
    "adp" INTEGER NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "Hitter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_authToken_key" ON "Session"("authToken");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
