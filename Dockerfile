FROM ubuntu:latest
MAINTAINER Ray ALez <raymestalez@gmail.com>

# Setup environment variables containing paths
ENV HOMEDIR=/home
ENV PROJECTDIR=/home/chat
ENV FRONTENDDIR=/home/chat/frontend
ENV BACKENDDIR=/home/chat/backend	

# Install basic apps
RUN apt-get update && apt-get install -y git emacs curl

# Install node 7
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs 
	    	    
# Copy project files with git:       
# WORKDIR $HOMEDIR       
# RUN git clone https://github.com/raymestalez/chat

# Copy project files into /home/chat folder.
RUN mkdir -p $PROJECTDIR
WORKDIR $PROJECTDIR
COPY . .

# Install backend dependencies
WORKDIR $BACKENDDIR
RUN npm install		
# WORKDIR $DOCKYARD_FRONTEND
# RUN npm install

    
# Port to expose
EXPOSE 3000

CMD [ "npm", "start" ]

	

	
