
all: build

build:
	GOPATH=$(HOME)/streamrail/go .
	go build

present:
	$(MAKE) show || $(MAKE) message
	
show:
	present

message:
	@echo "\033[0;31m"
	@echo present not install run make install
	@echo "\033[0m"

install:
	go get golang.org/x/tools/cmd/present		