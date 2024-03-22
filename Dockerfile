FROM node:16-alpine
ARG backUrl
ARG googleId
ARG googleSecret
ARG nextSecret
ARG nextUrl
# set env vars
ENV NEXT_PUBLIC_API_URL=${backUrl}
ENV GOOGLE_CLIENT_ID=${googleId}
ENV GOOGLE_CLIENT_SECRET=${googleSecret}
ENV NEXTAUTH_URL=${nextUrl}
ENV NEXTAUTH_SECRET=${nextSecret}

# Set the working directory inside the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install --force
# Copy the entire project to the working directory
COPY . .
# # Build the Next.js app
# RUN npm run build
# Expose the port that the app will run on
EXPOSE 3000
# Start the app
CMD ["npm" ,"start"]
