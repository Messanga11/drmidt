from django.db import models
from django.utils import timezone
from django.urls import reverse


class PublishedManager(models.Manager):

    def get_queryset(self):
        return super(PublishedManager,
                     self).get_queryset() \
            .filter(status='published', )


class Categories(models.TextChoices):
    Actualite = 'actualite'
    Magzi = 'magazine'
    Anor = 'annouce'
    Mines = 'mines'
    Industries = 'industries'
    Developpement_Technologique = 'développement_Technologique'
    Blog_Post = 'blog_Post'


class Post(models.Model):
    STATUS_CHOICES = (

        ('draft', 'Draft'),
        ('published', 'Published')
    )
    title = models.CharField(max_length=250)
    category = models.CharField(max_length=50, choices=Categories.choices, default=Categories.Actualite)
    excerpt = models.CharField(max_length=150)
    slug = models.SlugField(max_length=250, unique_for_date='publish')
    thumbnail = models.ImageField(upload_to='photos/%Y/%m', blank=True)
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.SlugField(max_length=30, choices=STATUS_CHOICES, default='draft')
    object = models.Manager()
    published = PublishedManager()

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog:post_detail',
                       args=[self.publish.year,
                             self.publish.month,
                             self.publish.day, self.slug])
