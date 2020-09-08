## Gitlab CI/CD
Thanks to our [GitLab instance](https://github.com/VictorMorenoJimenez/tfg2020/blob/master/doc/playbooks/create_gitlab.md), we can easily configure CI/CD pipelines for our applications.
This guide assumes that you have completed [docker image build and push](https://github.com/VictorMorenoJimenez/tfg2020/blob/master/doc/app/dockerize.md) section.

So, you should have:
* GitLab instance configured.
* GitLab registry configured.
* Backend and frontend image uploaded to registry.


### Configure GitLab repository.
On `backend` repository we can create a file called `gitlab-ci.yml` with the following:

```yml
stages:
  - build
  - test
  - deploy 

variables:
  IMAGE_NAME: $REGISTRY_URL/django/app-backend
  SWARM_SERVICE_NAME: 'app_backend'
  SWARM_SERVICE_TEST: 'swarm_test'
  SWARM_SERVICE_CELERY: 'app_celery'

build:
  stage: build
  before_script:
   - docker login $REGISTRY_URL --username $REGISTRY_USERNAME --password $REGISTRY_PASSWORD
  script:
    - docker build -t $IMAGE_NAME:$CI_COMMIT_SHORT_SHA .
    - docker tag $IMAGE_NAME:$CI_COMMIT_SHORT_SHA $IMAGE_NAME:latest
    - docker push $IMAGE_NAME:$CI_COMMIT_SHORT_SHA
    - docker push $IMAGE_NAME:latest
  only:
    - master

test:
  stage: test
  script:
    - sudo -u $SSH_USER ssh $SWARM_HOST_TEST docker service update --with-registry-auth --image $IMAGE_NAME:$CI_COMMIT_SHORT_SHA $SWARM_SERVICE_TEST --detach
    - sudo -u $SSH_USER ssh $SWARM_HOST_TEST docker service update --with-registry-auth --image $IMAGE_NAME:$CI_COMMIT_SHORT_SHA $SWARM_SERVICE_CELERY --detach
  only:
    - master

deploy:
  stage: deploy
  script:
    - sudo -u $SSH_USER ssh $SWARM_HOST docker service update --with-registry-auth --image $IMAGE_NAME:$CI_COMMIT_SHORT_SHA $SWARM_SERVICE_NAME --detach
    - sudo -u $SSH_USER ssh $SWARM_HOST docker service update --with-registry-auth --image $IMAGE_NAME:$CI_COMMIT_SHORT_SHA $SWARM_SERVICE_CELERY --detach
  only:
    - master

logging:
  stage: .post
  script:
      - sudo -u $SSH_USER ssh $SWARM_HOST docker service logs $SWARM_SERVICE_NAME --tail 200
      - sudo -u $SSH_USER ssh $SWARM_HOST docker service logs $SWARM_SERVICE_CELERY --tail 200
  when: manual

```

This `gitlab-ci.yml` file, will execute three stages:
* `build`: Build new image with new code.
* `test`: Deploy image on test cluster.
* `deploy`: If test runs okey, deploy app on cluster.

The frontend `gitlab-ci.yml` file it is the same, feel free to check it [here](https://github.com/VictorMorenoJimenez/tfg2020/blob/master/django-project/frontend/.gitlab-ci.yml).
